// import { Test, TestingModule } from '@nestjs/testing';
// import { StudentController } from './student.controller';
// import { StudentService } from './student.service';
// import { PrismaModule } from '../prisma/prisma.module';
// import { GetStudentsResponseDto } from './dto/res-get-students.dto';

// describe('StudentController', () => {
//   let controller: StudentController;
//   let service: StudentService;

//   const mockStudentService={
//     findStudents: jest.fn(),
//     updateStudent: jest.fn(),
//   };

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       imports: [PrismaModule],
//       controllers: [StudentController],
//       providers: [StudentService],
//     }).overrideProvider(StudentService).useValue(mockStudentService).compile();

//     controller = module.get<StudentController>(StudentController);
//     service = module.get<StudentService>(StudentService);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });

//   describe('findStudentForSearch', () =>{
//     it ('should return students', async () =>{
//       const result: GetStudentsResponseDto={
//         students:[{
//           id:'1',
//           email:'soski@mail.ru',
//           firstName:
//         },
//         ],
//       }
//       expect(controller.findStudentForSearch).to
//     })
// });
