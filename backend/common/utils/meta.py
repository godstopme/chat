def first_base_model(abstract, instance):
    for cls in reversed(instance.__class__.__mro__):
        if issubclass(cls, abstract) and not cls._meta.abstract:
            return cls

    return instance.__class__
