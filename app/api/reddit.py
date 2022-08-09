from flask_openapi3 import APIBlueprint

from app.api.reddit_auth import auth_api
from app.model import RedditPost, SNSPostResponse, User
from app.client.reddit import RedditClient
from app.auth import jwt_security, jwt_token
from app.config import reddit_tag

api = APIBlueprint('reddit', __name__, url_prefix='/reddit',
                   abp_tags=[reddit_tag], abp_security=jwt_security)

api.register_api(auth_api)


@api.post('/post', responses={'200': SNSPostResponse})
@jwt_token
def reddit_post(form: RedditPost, token: str):
    """ Submit a reddit post
    """
    client = RedditClient(token)
    post_id = client.submit_post(form)

    url = None
    if post_id:
        # post_id contains a type prefix
        actual_id = post_id.split('_')[-1]
        url = f'https://reddit.com/r/{form.subreddit}/comments/{actual_id}'
    return SNSPostResponse(url=url).dict()


@api.get('/user', responses={'200': User})
@jwt_token
def user(token: str):
    data = RedditClient(token).get('/api/v1/me')
    return User(id=data['id'], name=data['name']).dict()
