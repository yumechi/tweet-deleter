interface Setting {
  consumerKey: string
  consumerSecret: string
  accessToken: string
  accessTokenSecret: string
  keepTags: string[]
  exceptionIds: string[]
}

export function settings(): Setting {
  return {
    consumerKey: process.env.CONSUMER_KEY || '',
    consumerSecret: process.env.CONSUMER_SECRET || '',
    accessToken: process.env.ACCESS_TOKEN || '',
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || '',
    keepTags: [
      '楓推し', 'keep',
    ],
    exceptionIds: [
      '825373820512899074',
      '1013765942952669185',
      '1043116090967044097',
      '1085189018797535233',
      '1085219841189892096',
      '1102598477203140609',
      '1102603760600211456',
      '1102608720956076032',
      '1106449960164163584',
      '1112564975653081088',
      '1112603128866594816',
      '1112739204184702976',
      '1156837082205081600',
      '1156858976555847680',
      '1163294213032665093',
      '1171639096613072896',
      '1179030460669628416',
      '1179032075136991233',
      '1196314802726944769',
      '1196318804269101062',
      '1196319714898694144',
      '1204820013883912192',
      '1204940632747171841',
      '1204947682525007873',
      '1217101599891308544',
      '1217101911913975808',
      '1217104019908259844',
      '1217681907913068545',
      '1235350728182394880',
      '1235385884238704643',
      '1235755953435209729',
      '1245725694652375042',
      '1253305148215930880',
      '1260592252608339971',
      '1268110451155431430',
      '1271021579074277377',
      '1270848663116365829',
      '1272435458333523968',
      '1273722072808603649',
      '1273837461676847104',
      '1302689650700505088',
      '1305941348382466048',
      '1308334625719087105',
      '1310540134404685824',
      '1312787217954164740',
      '1312756125347901441',
      '1325818271241658369',
      '1333433879319826433',
      '1333441637624627200',
      '1333443906076254209',
      '1336165877356482562',
      '1336165976614739969',
      '1346141245937094658',
      '1348848079433129989',
      '1352944444987777024',
      '1352947631756988417',
      '1353244267423010817',
      '1352961873696571392',
      '1357022584789823489',
      '1368651005215141888',
      '1374781441205174272',
      '1382269397717417989',
      '1389327205046489090',
    ],
  }
}
