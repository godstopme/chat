import itertools
from functools import partial
from functools import reduce

default_getattr = partial(getattr, default=None)


def deep_getattr(object, attr, default=None):
    try:
        return reduce(getattr, attr.split('.'), object)
    except AttributeError:
        return default


def deep_attrgetter(attr, default=None):
    return lambda obj: deep_getattr(obj, attr, default)


def is_(type):
    return lambda obj: isinstance(obj, type)


def flatten(list_of_lists):
    return itertools.chain(*list_of_lists)


def divide(condition, collection):
    true, false = list(), list()

    for item in collection:
        (false, true)[condition(item)].append(item)

    return true, false


def checkattr(obj):
    return partial(hasattr, obj)


class Composer:
    class StopExecution(BaseException):
        def __init__(self, default_value=None):
            self.default_value = default_value

    def __init__(self, *functions):
        first, *rest = reversed(functions)

        self.fn = lambda *args, **kwargs: reduce(lambda f, g: g(f), rest, first(*args, **kwargs))

    def pipe(self, *functions):
        self.fn = Composer(*functions, self.fn).fn

        return self

    def pipe_first(self, *functions):
        self.fn = Composer(self.fn, *functions).fn

        return self

    def except_stop(self, default=None):
        composed = self.fn

        def stop(*args, **kwargs):
            try:
                return composed(*args, **kwargs)
            except:
                raise self.StopExecution(default)

        self.fn = stop

        return self

    def except_default(self, default):
        composed = self.fn

        def supress(*args, **kwargs):
            try:
                return composed(*args, **kwargs)
            except:
                return default

        self.fn = supress

        return self

    def execute(self, *args, **kwargs):
        try:
            return self.fn(*args, **kwargs)
        except self.StopExecution as e:
            return e.default_value

    def __call__(self, *args, **kwargs):
        return self.execute(*args, **kwargs)


compose = Composer
