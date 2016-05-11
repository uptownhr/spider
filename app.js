const request = require('request-promise'),
  cheerio = require('cheerio'),
  minify = require('html-minifier').minify,
  URL = require('url')

class Spider {
  constructor(entry) {
    this.entry = entry
  }

  async start() {
    this.listen()

    let link = await this.fetch(this.entry)
    this.addLink(link)
  }

  kill() {

  }

  listen() {

  }

  addLink(link) {
    console.log(link)
  }

  async fetch(url) {
    let body = await request(url)
    body = minify(body, { collapseWhitespace: true })

    const $ = cheerio.load(body)

    let title = $('title').text()
    let p = $('p').map( (i, el) => $(el).text() ).get()
    let h = $(':header').map( (i, el) => $(el).text().substring(0,64) ).get()
    let a = $('a').map( (i, el) => $(el).attr('href') ).get()
    let img = $('img').map( (i, el) => $(el).attr('src') ).get()
    let parsed_url = URL.parse(url)

    return {
      title, a, p, h, img, body,
      url: parsed_url
    }
  }
}

const url = 'http://jlee.biz'
const spider = new Spider(url)
spider.start()