import { Injectable } from '@nestjs/common';
import { UUID } from 'src/commons/types/uuid';
import { HistorySearch } from '../core/historySearches.entity';
import { HistorySearchesRepository } from '../core/historySearches.repository';
import { PrismaService } from 'src/commons/infraestructure/db/prisma/prisma.service';
import { User } from 'src/users/core/user.entity';

@Injectable()
export class HistorySearchesDBRepository implements HistorySearchesRepository {
  constructor(private prisma: PrismaService) {}

  async create(historySearch: HistorySearch): Promise<HistorySearch> {
    const record = await this.prisma.historySearch.create({
      data: {
        uuid: historySearch.getUuid(),
        user: {
          connect: {
            uuid: historySearch.getUser().getUuid(),
          },
        },
        query: historySearch.getQuery(),
        createdAt: historySearch.getCreatedAt(),
      },
    });
    return this.#mapToModel(record);
  }

  async findAll(): Promise<HistorySearch[]> {
    const records = await this.prisma.historySearch.findMany({
      orderBy: [{ query: 'asc' }],
    });
    return records.map((r) => this.#mapToModel(r));
  }

  async remove(uuid: UUID): Promise<HistorySearch> {
    const record = await this.prisma.historySearch.delete({
      where: {
        uuid,
      },
    });
    return this.#mapToModel(record);
  }

  #mapToModel = (historySearchRecord: any): HistorySearch => {
    return new HistorySearch(
      historySearchRecord.uuid,
      new User(
        historySearchRecord.user.uuid,
        historySearchRecord.user.name,
        historySearchRecord.user.email,
        historySearchRecord.user.password,
        historySearchRecord.user.refreshToken,
        historySearchRecord.user.createdAt,
        historySearchRecord.user.updatedAt,
      ),
      historySearchRecord.query,
      historySearchRecord.createdAt,
      historySearchRecord.updatedAt,
    );
  };
}
