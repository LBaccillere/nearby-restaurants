import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../presentation/users.controller';
import { UsersService } from '../core/users.service';
import { UsersFakeRepository } from './usersFakeRepository';
import { EncryptService } from 'src/commons/services/encrypt.service';

describe('Users', () => {
  let usersController: UsersController;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: 'UsersRepository',
          useClass: UsersFakeRepository,
        },
        UsersService,
        EncryptService,
      ],
      exports: [UsersService],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    userService = module.get(UsersService);
  });

  it('controller should be defined', () => {
    expect(usersController).toBeDefined();
  });

  it('service should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('create', async () => {
    const email = 'email1';
    const user = await userService.create({
      name: 'name1',
      email,
      password: 'password1',
    });
    expect(user.getEmail()).toBe(email);
  });

  it('findAll', async () => {
    await userService.create({
      name: 'name1',
      email: 'email1',
      password: 'password1',
    });
    const result = await userService.findAll();
    expect(result.length).toBe(1);
  });

  it('findOne', async () => {
    const email = 'emailFund';
    const user = await userService.create({
      name: 'name1',
      email,
      password: 'password1',
    });
    const received = await userService.findOne(user.getUuid());
    expect(received.getUuid()).toBe(user.getUuid());
  });

  it('findByEmail', async () => {
    const email = 'emailFund';
    const user = await userService.create({
      name: 'name1',
      email,
      password: 'password1',
    });
    const received = await userService.findByEmail(user.getEmail());
    expect(received.getEmail()).toBe(user.getEmail());
  });

  it('update', async () => {
    const email = 'email1';
    const email2 = 'email2';
    const user = await userService.create({
      name: 'name1',
      email,
      password: 'password1',
    });
    const received = await userService.update(user.getUuid(), {
      email: email2,
    });
    expect(received.getEmail()).toBe(email2);
  });

  it('remove', async () => {
    const email = 'email1';
    const user = await userService.create({
      name: 'name1',
      email,
      password: 'password1',
    });
    await userService.remove(user.getUuid());
    const received = await userService.findOne(user.getUuid());
    expect(received).toBe(undefined);
  });
});
