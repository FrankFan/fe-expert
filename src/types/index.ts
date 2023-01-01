export type DAppDetailParam = {
  id: string
  userId: string
  version: string
  lang: string
}

export interface CountdownType {
  day: number
  hour: number
  minute: number
  second: number
}

export interface DisplayDataType {
  imgUrl: string
  shareImgUrl?: string
  endDateTime: string
  totalReward: number
  isActivityEnd: boolean
  hasJoined: boolean
  digits: number
}

export interface ResultStatisticsType {
  championTeamFlagUrl: string
  championTeamId: number
  championTeamName: string
  championTeamNftUrl: string
  eachNftReward: number
  mintNftCount: string
  rewardNftCount: string
  totalAddressCount: string
  totalReward: number
}

export type DirectionType = 'add' | 'minus'

export interface NFTTeamSelectParams {
  id: number
  count: number
  mintPrice: number
  flagUrl: string
  nftUrl: string
  teamName: string
}

export interface freeMintObjType {
  id: number
  mintPrice: number
}

export interface QueryObjType {
  select: Array<NFTTeamSelectParams>
  eliminate: Array<NFTTeamSelectParams>
}

export interface SignType {
  deviceId: string
  signature: string
  nonce: string
  totalFreeMint?: number
}

export interface Teams {
  id: number
  name: string
  flagUrl: string
  nftUrl: string
  mintPrice: number
  totalMintCount: number
  myMintCount: number
  count?: number
  maxMintCount?: number
}

export interface CompetitionTeamResult {
  currentCompetitionId?: number
  currentCompetitionDesc?: string
  mintRate: number
  maxMintCount?: number
  stopMint?: boolean
  totalFreeCount: number
  competitionGroup: Array<{
    groupName: string
    teams: Array<Teams>
  }>
  eliminateTeams: Array<Teams>
}
