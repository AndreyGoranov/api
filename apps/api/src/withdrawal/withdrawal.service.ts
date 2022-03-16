import { Injectable, NotFoundException } from '@nestjs/common'
import { Withdrawal } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { CreateWithdrawalDto } from './dto/create-withdrawal.dto'
import { UpdateWithdrawalDto } from './dto/update-withdrawal.dto'

@Injectable()
export class WithdrawalService {
  constructor(private prisma: PrismaService) {}

  async create(CreateWithdrawalDto: CreateWithdrawalDto): Promise<Withdrawal> {
    return await this.prisma.withdrawal.create({ data: CreateWithdrawalDto })
  }

  async findAll(): Promise<Withdrawal[]> {
    return await this.prisma.withdrawal.findMany({
      include: { bankAccount: true, approvedBy: true, sourceCampaign: true, sourceVault: true },
    })
  }

  async findOne(id: string): Promise<Withdrawal | null> {
    const result = await this.prisma.withdrawal.findUnique({
      where: { id },
      include: { bankAccount: true, approvedBy: true, sourceCampaign: true, sourceVault: true },
    })
    if (!result) throw new NotFoundException('Not found')
    return result
  }

  async update(id: string, updateWithdrawalDto: UpdateWithdrawalDto): Promise<Withdrawal | null> {
    const result = await this.prisma.withdrawal.update({
      where: { id: id },
      data: updateWithdrawalDto,
    })
    if (!result) throw new NotFoundException('Not found')
    return result
  }

  async remove(id: string): Promise<Withdrawal | null> {
    const result = await this.prisma.withdrawal.delete({ where: { id: id } })
    if (!result) throw new NotFoundException('Not found')
    return result
  }

  //DELETE MANY
  async removeMany(itemsToDelete: string[]): Promise<{ count: number }> {
    try {
      return await this.prisma.withdrawal.deleteMany({
        where: {
          id: {
            in: itemsToDelete,
          },
        },
      })
    } catch (error) {
      throw new NotFoundException()
    }
  }
}
