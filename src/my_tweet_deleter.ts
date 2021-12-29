import * as fs from "fs";
import { settings } from './settings'
import TwitterUtil from './twitter-util'

const main = async () => {
  const repoUrl = 'https://github.com/yumechi/tweet-deleter'
  const twitter = new TwitterUtil()

  const filename = './input_data.json'
  const contents = JSON.parse(fs.readFileSync(filename, 'utf-8'))
  const limit = 200 + Math.floor( Math.random() * 300 )

  try {

    contents[0]['status'] = true

    // envロード
    settings()
    let send_count = 0
    for (const [index, content] of contents.entries()) {
      if(content['status']) continue
      try {
        await twitter.destroy(content['tweet_id'])
      } catch(error) {
        console.log(`tweet 削除時のエラー: tweet_id=${content['tweet_id']}, error=${error}`)
      }
      await send_count++
      console.log(`delete: tweet_id=${content['tweet_id']}`)
      contents[index]['status'] = true
      if(send_count >= limit) {
        break
      }
    }

    if(send_count > 0) await twitter.tweet(`【BOT】 ${send_count}個のツイートを削除しました\n${repoUrl}`)
  } catch (error) {
    console.log(error)
    await twitter.tweet(`【BOT】 エラーが発生しました: ${error}`)
    throw error
  } finally {
    const writeObject = JSON.stringify(contents)
    fs.writeFileSync('input_data.json', writeObject)
    process.exit();
  }
}

if (require.main === module) {
  main()
}
