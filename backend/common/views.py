import collections
import inspect
import itertools
from typing import Dict

from sanic.views import HTTPMethodView


class HttpActionDecorator:
    def __init__(self, url=None, methods=None):
        methods = methods or ['get']
        assert isinstance(methods, list), 'methods action decorator parameter must be a list'
        self.url = url
        self.methods = [method.lower() for method in methods]

    def __call__(self, function):
        url = self.url or function.__name__

        function.__is_dynamic_route__ = True
        function.__url_path__ = url
        function.__http_methods__ = self.methods

        return function


action = HttpActionDecorator

Route = collections.namedtuple('Route', ['url', 'mapping'])

resource_action_names = ['list', 'create', 'retrieve', 'update', 'partial_update', 'remove']


class ResourceView(HTTPMethodView):
    lookup_url_argument = '<id:int>'

    @classmethod
    def get_http_actions(cls):
        def is_dynamic_route(attr):
            return hasattr(attr, '__is_dynamic_route__')

        return [method for _, method in inspect.getmembers(cls, is_dynamic_route)]

    @classmethod
    def register_for_app(cls, app, prefix):
        resource_route_patterns = [
            Route(
                url='',
                mapping={
                    'get': 'list',
                    'post': 'create',
                }
            ),
            Route(
                url=f'{getattr(cls, "lookup_url_argument")}',
                mapping={
                    'get': 'retrieve',
                    'put': 'update',
                    'patch': 'partial_update',
                    'delete': 'remove',
                }
            ),
        ]

        def create_custom_route(http_action) -> Route:
            return Route(
                url=f'{http_action.__url_path__}',
                mapping={http_method: http_action.__name__ for http_method in http_action.__http_methods__}
            )

        def create_route_actions(route: Route) -> Dict[str, str]:
            return {http_method: http_action for http_method, http_action in route.mapping.items()
                    if hasattr(cls, http_action)}

        # list, retrieve, etc.
        resources_actions = zip(resource_route_patterns, map(create_route_actions, resource_route_patterns))

        http_actions = cls.get_http_actions()
        custom_routes = list(map(create_custom_route, http_actions))
        custom_actions = zip(custom_routes, map(create_route_actions, custom_routes))

        action_names = [resource_action for resource_action in resource_action_names if hasattr(cls, resource_action)]
        action_names += [http_action.__name__ for http_action in http_actions]

        for route, actions in filter(bool, itertools.chain(resources_actions, custom_actions)):
            view = cls.as_view(action_names, actions)
            delimiter = '' if prefix.endswith("/") else '/'
            route_url = f'{prefix}{delimiter}{route.url}'
            app.add_route(view, route_url)

    @classmethod
    def as_view(cls, defined_action_names, dynamic_actions, *class_args, **class_kwargs):
        def view(*args, **kwargs):
            self = view.view_class(*class_args, **class_kwargs)
            return self.dispatch_request(*args, **kwargs)

        if cls.decorators:
            view.__module__ = cls.__module__
            for decorator in cls.decorators:
                view = decorator(view)

        view.view_class = cls.construct_view_class(cls, defined_action_names, dynamic_actions)
        view.__doc__ = cls.__doc__
        view.__module__ = cls.__module__
        view.__name__ = cls.__name__

        return view

    @staticmethod
    def construct_view_class(cls, defined_action_names, dynamic_actions):
        not_needed_mappings = set(defined_action_names) - set(dynamic_actions.values())
        view_class_attrs = {k: v for k, v in cls.__dict__.items() if k not in not_needed_mappings}

        view_class = type(cls.__name__, inspect.getmro(cls), view_class_attrs)

        for http_method, http_action_name in dynamic_actions.items():
            handler = getattr(view_class, http_action_name)
            setattr(view_class, http_method, handler)
            delattr(view_class, http_action_name)

        return view_class
