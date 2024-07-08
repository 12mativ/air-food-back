import { Test, TestingModule } from '@nestjs/testing';
import { SimulatorController } from './simulator.controller';
import { SimulatorService } from './simulator.service';
import { PrismaModule } from '../prisma/prisma.module';
import { CreateSimulatorDto } from './dto/create-simulator.dto';
import { ResGetSimulatorDto } from './dto/res-get-simulator.dto';
import { UpdateSimulatorDto } from './dto/update-simulator.dto';

describe('SimulatorController', () => {
  let controller: SimulatorController;
  let simulatorService: SimulatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [SimulatorController],
      providers: [SimulatorService],
    }).compile();

    controller = module.get<SimulatorController>(SimulatorController);
    simulatorService = module.get<SimulatorService>(SimulatorService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a simulator', async () => {
    const createDto: CreateSimulatorDto = {
      name: 'Simulator1',
      courseId: 'Course1Id'
    };

    const expectedResult = {
      ...createDto,
      id: 'simulatorId',
    };

    jest.spyOn(simulatorService, 'create').mockResolvedValue(expectedResult);

    const result = await controller.create(createDto);

    expect(result).toEqual(expectedResult);
  });

  it('should find simulator on course', async () => {
    const courseId = 'courseId1';
    const simulatorsDto: ResGetSimulatorDto[] = [
      { id: 'simulatorId1', name: 'Simulator1', courseId: 'courseId1'},
      { id: 'simulatorId2', name: 'Simulator2', courseId: 'courseId1'}
    ];

    jest.spyOn(simulatorService, 'findSimulatorsOnCourse').mockResolvedValue(simulatorsDto);

    const result = await controller.findSimulatorsOnCourse(courseId);

    expect(simulatorService.findSimulatorsOnCourse).toHaveBeenCalledWith(courseId);
    expect(result).toEqual(simulatorsDto);
  });

  it('should find simulator on event', async () => {
    const eventId = 'eventId1';
    const simulatorsDto: ResGetSimulatorDto[] = [
      { id: 'simulatorId1', name: 'Simulator1', courseId: 'courseId1'},
      { id: 'simulatorId2', name: 'Simulator2', courseId: 'courseId1'}
    ];

    const expectedSimulators = [{ simulators: simulatorsDto }];

    jest.spyOn(simulatorService,'findSimulatorsOnEvent').mockResolvedValue(expectedSimulators);

    const result = await controller.findSimulatorsOnEvent(eventId);

    expect(simulatorService.findSimulatorsOnEvent).toHaveBeenCalledWith(eventId);
    expect(result).toEqual(expectedSimulators);
  });
  it('should update a simulator', async () => {
    const simulatorId = 'simulatorId1';
    const updateDto: UpdateSimulatorDto = {
      name: 'UpdatedSimulatorName'
    };
  
    const expectedResult = {
      id: simulatorId,
      courseId: 'courseId',
      ...updateDto,
    };
  
    jest.spyOn(simulatorService, 'update').mockResolvedValue(expectedResult);
  
    const result = await controller.update(simulatorId, updateDto);
  
    expect(simulatorService.update).toHaveBeenCalledWith(simulatorId, updateDto);
    expect(result).toEqual(expectedResult);
  });
  it('should delete a simulator', async () => {
    const simulatorId = 'simulatorId1';
    
    jest.spyOn(simulatorService, 'remove').mockResolvedValue(undefined);
    
    const result = await controller.remove(simulatorId);
    
    expect(simulatorService.remove).toHaveBeenCalledWith(simulatorId);
    expect(result).toBeUndefined();
  });
});

