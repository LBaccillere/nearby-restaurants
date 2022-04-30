import { User } from 'src/users/core/user.entity';
import {
  UserResponse,
  mapToResponse as mapToUserResponse,
} from './user.response';

type UsersResponse = {
  users: UserResponse[];
};

const mapToResponse = (users: User[]): UsersResponse => {
  return {
    users: users.map((i) => mapToUserResponse(i)),
  };
};

export { UsersResponse, mapToResponse };
