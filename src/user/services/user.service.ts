import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';
import { CreateUserInput } from '../dtos';
import { UserEntity } from '../user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async create(input: CreateUserInput): Promise<UserEntity> {
    const duplicateUser = await this.findByEmail(input.email);
    if (duplicateUser) {
      throw new ConflictException('User already exists!');
    }
    const entity = this.repository.create({
      ...input,
      password: await this.authService.hashPassword(input.password),
    });

    return this.repository.save(entity);
  }

  async find(): Promise<UserEntity[]> {
    return this.repository.find();
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return this.repository.findOne({ where: { email } });
  }

  async findById(id: number): Promise<UserEntity> {
    return this.repository.findOneOrFail({ where: { id } });
  }
}
