import { UUID } from 'src/commons/types/uuid';
import { User } from 'src/users/core/user.entity';

type UserResponse = {
  uuid: UUID;
  name: string;
  email: string;
};

const mapToResponse = (user: User): UserResponse => {
  return {
    uuid: user.getUuid(),
    name: user.getName(),
    email: user.getEmail(),
  };
};

export { UserResponse, mapToResponse };
