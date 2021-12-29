import schedule
import time
import subprocess


def job():
  print("delete job")
  subprocess.run("npx ts-node src/my_tweet_deleter.ts >> debug.log", shell=True, check=True)

schedule.every().hour.at(":20").do(job)

print("cron job start")
while True:
  schedule.run_pending()
  time.sleep(1)
