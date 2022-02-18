import { Injectable } from '@nestjs/common';
import { CreateTestAppInput } from './dto/create-test-app.input';
import { UpdateTestAppInput } from './dto/update-test-app.input';

@Injectable()
export class TestAppService {
  create(createTestAppInput: CreateTestAppInput) {
    return 'This action adds a new testApp';
  }

  findAll() {
    return `This action returns all testApp`;
  }

  findOne(id: number) {
    return `This action returns a #${id} testApp`;
  }

  update(id: number, updateTestAppInput: UpdateTestAppInput) {
    return `This action updates a #${id} testApp`;
  }

  remove(id: number) {
    return `This action removes a #${id} testApp`;
  }
}
