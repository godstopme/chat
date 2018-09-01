from os.path import abspath
from os.path import dirname
from os.path import join

DEBUG = True

RUN_DIR_NAME = 'run'

STATIC_DIR_NAME = f'static/{"build" if DEBUG else "dist"}'

MEDIA_DIR_NAME = 'media'

DATA_DIR_NAME = 'data'

APP_DIR = dirname(abspath(__file__))

PROJECT_DIR = dirname(APP_DIR)
print(PROJECT_DIR)
RUN_DIR = join(PROJECT_DIR, RUN_DIR_NAME)

STATIC_DIR = join(RUN_DIR, STATIC_DIR_NAME)

MEDIA_DIR = join(RUN_DIR, MEDIA_DIR_NAME)

DATA_DIR = join(RUN_DIR, DATA_DIR_NAME)
print(DATA_DIR)

SECRET_KEY = 'ol6m-3&yn5*n9p69!@a+9j55*44cwry(lisw(m!qz5wc2qfqw$'

ALLOWED_HOSTS = ['*']

VENDOR_APPS = [
    'channels',
]

DJANGO_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

PROJECT_APPS = [
    'accounts',
    'chat',
]

INSTALLED_APPS = VENDOR_APPS + DJANGO_APPS + PROJECT_APPS

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            join(APP_DIR, 'templates'),
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'wsgi.application'

ASGI_APPLICATION = "routing.application"

CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            'hosts': [('127.0.0.1', 6379)],
        },
    },
}

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': join(DATA_DIR, 'db.sqlite3'),
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

AUTH_USER_MODEL = 'accounts.User'

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'core.security.authentication.TokenAuthentication',
    ),
}

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

STATIC_URL = '/static/'
LOGIN_REDIRECT_URL = '/'
