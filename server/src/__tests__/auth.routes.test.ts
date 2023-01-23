import app from '../server'
import supertest from 'supertest'
import request from 'supertest'
import prisma from '../db'
import { hashPassword } from '../modules/auth'


describe('GET /', () => {
    it('it should send back some data', async () => {
        const res = await supertest(app)
            .get('/')

        expect(200)
        expect(res.body.message).toBe('Hello')
    })
})


describe('POST /user', () => {
    it('responds with json', async () => {
        const res = await request(app)
            .post('/user')
            .send({ username: 'signupUser', password: 'signupUserPass' })
            .set('Accept', 'application/json')

        expect(res.headers['content-type']).toMatch(/json/)
        expect(res.body.token).toBeTruthy()
        expect(res.status).toEqual(200)
    })

    afterAll(async () => {
        await prisma.user.delete({
            where: {
                username: 'signupUser'
            }
        })
    })
})


describe('POST /signin', () => {
    beforeAll(async () => {
        await prisma.user.create({
            data: {
                username: 'signinUser',
                password: await hashPassword('signinUserPass')
            }
        })
    })

    it('responds with json', async () => {

        const res = await request(app)
            .post('/signin')
            .send({ username: 'signinUser', password: 'signinUserPass' })
            .set('Accept', 'application/json')

        expect(res.headers['content-type']).toMatch(/json/)
        expect(res.body.token).toBeTruthy()
        expect(res.status).toEqual(200)
    })

    afterAll(async () => {
        await prisma.user.delete({
            where: {
                username: 'signinUser'
            }
        })
    })
})