import { PrismaPg } from '@prisma/adapter-pg'

import { PrismaClient } from '@/generated/prisma/client'

import { url } from '../../prisma.config'

const adapter = new PrismaPg({ connectionString: url })
export const prisma = new PrismaClient({ adapter })
