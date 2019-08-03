import * as Twit from 'twit'
import { Status } from 'twitter-d'
import * as bigInt from 'big-integer'
import { settings } from './settings'

export default class TwitterUtil {
  private twitter: Twit

  constructor() {
    this.twitter = new Twit({
      consumer_key: settings().consumerKey,
      consumer_secret: settings().consumerSecret,
      access_token: settings().accessToken,
      access_token_secret: settings().accessTokenSecret,
    })
  }

  public async getAllTweets(): Promise<Status[]> {
    let tweets: Status[] = []
    const payload: { [s: string]: string | number | boolean } = {
      count: 200,
      trim_user: true,
      tweet_mode: 'extended',
    }
    while (true) {
      const ret = await this.twitter.get('statuses/user_timeline', payload)
      const statuses = ret.data as Status[]
      if (statuses.length === 0) { break }
      payload.max_id = bigInt(statuses[statuses.length - 1].id_str)
        .plus(-1)
        .toString()
      tweets = tweets.concat(statuses)
    }
    return tweets
  }

  public async tweet(text: string): Promise<void> {
    const payload = {
      status: text,
    }
    await this.twitter.post('statuses/update', payload)
  }

  public async destroy(id: string): Promise<void> {
    const payload = {
      id,
    }
    await this.twitter.post('statuses/destroy/:id', payload)
  }

  public async show(id: string): Promise<Status> {
    const payload = {
      id,
    }
    const ret = await this.twitter.get('statuses/show/:id', payload)
    return ret.data as Status
  }

  // いきなりステーキの反対語選手権関連のツイートであるか判定します
  public async isIkinari(id: string): Promise<boolean> {
    return this.isInTree(id, '1130812094855749632')
  }

  // ことばパレット関連のツイートであるか判定します
  public async isKotoba(id: string): Promise<boolean> {
    return this.isInTree(id, '1156837082205081600')
  }

  private async isInTree(id: string, rootId: string) {
    let seek = id
    while (true) {
      if (seek === rootId) { return true }
      try {
        const status = await this.show(seek)
        if (!status.in_reply_to_status_id_str) { break }
        seek = status.in_reply_to_status_id_str
      } catch (error) {
        const errorStr = error.toString() as string
        if (errorStr.includes('Rate limit')) { throw new Error('Rate limit exceeded') }
        break
      }
    }
    return false
  }

}
