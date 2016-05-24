'use strict'

console.log('Loading bot...')

const smoochBot = require('smooch-bot')
const MemoryStore = smoochBot.MemoryStore
const MemoryLock = smoochBot.MemoryLock
const Bot = smoochBot.Bot
const StateMachine = smoochBot.StateMachine
const fs = require('fs')

class ConsoleBot extends Bot {
    constructor(options) {
        super(options)
    }

    say(text) {
        return new Promise((resolve) => {
            console.log(text)
            resolve()
        })
    }

    sendImage(imageFile) {
        return new Promise((resolve) => {
            console.log(`Image(${imageFile})`)
            resolve()
        })
    }
}

const script = require('../script')

const userId = 'testUserId'
const store = new MemoryStore()
const lock = new MemoryLock()
const bot = new ConsoleBot({
    store,
    lock,
    userId
})

const stateMachine = new StateMachine({
    script,
    bot,
    userId
})

process.stdin.on('data', function(data) {
    console.log(data)
    stateMachine.receiveMessage({
            text: data.toString().trim()
        })
        .catch((err) => {
            console.error(err)
            console.error(err.stack)
        })
})
