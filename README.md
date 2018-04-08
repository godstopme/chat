# chat

### how to install

1. `pip install pipenv`
2. `pipenv install`
3. `cd app`
4. `pipenv run manage.py migrate`
5. install redis (via docker: `docker run --name --rm redis -p 6379:6379 redis`)
6. `pipenv run manage.py runserver`
