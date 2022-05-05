import { ReportStatus, ReportReason, NotifierType } from '@prisma/client'
import { Campaign } from '../../campaign/entities/campaign.entity'
import { Person } from '../../person/entities/person.entity'

export class CampaignReport {
  id: string
  campaignId: string
  personId: string
  createdAt: Date
  updatedAt: Date | null
  status: ReportStatus
  reason: ReportReason
  notifierType: NotifierType
  reportContent: string
  campaign?: Campaign
  person?: Person
}
