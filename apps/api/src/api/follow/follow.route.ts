import express, { type Router } from 'express';

import { authenticate } from '@/common/middlewares';

import { followController } from './follow.controller';

export const followRouter: Router = express.Router();

followRouter.use(authenticate);

followRouter.post('/:userId', followController.follow);
followRouter.delete('/:userId', followController.unfollow);

followRouter.get('/:userId/followers', followController.getFollowers);
followRouter.get('/:userId/following', followController.getFollowing);
followRouter.get('/:userId/counts', followController.getFollowCounts);

followRouter.get('/suggestions/comprehensive', followController.getComprehensiveSuggestions);
followRouter.get('/suggestions/popular', followController.getPopularUsers);
followRouter.get('/suggestions/friends-of-friends', followController.getFriendsOfFriends);
followRouter.get('/suggestions/recently-active', followController.getRecentlyActiveUsers);
followRouter.get('/suggestions/new', followController.getNewUsers);

followRouter.delete('/followers/:followerId', followController.removeFollower);
