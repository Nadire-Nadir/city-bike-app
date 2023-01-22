import app from '../server'
import supertest from 'supertest'
import prisma from '../db'
import { createJWT, hashPassword } from '../modules/auth'


let jwt: string

describe('GET /api/journey', () => {
    let jwt: string
    beforeAll(async () => {
        const journeyTestUser = await prisma.user.create({
            data: {
                username: 'journeyTestUser',
                password: await hashPassword('journeyTestUserPass')
            }
        })
        jwt = createJWT(journeyTestUser)
    })

    it('responds with json', async () => {
        const res = await supertest(app)
            .get('/api/journey')

            .set({ authorization: `Bearer ${jwt}` })
        expect(res.headers['content-type']).toMatch(/json/)
        expect(res.status).toEqual(200)
    })
})


afterAll(async () => {
    await prisma.user.delete({
        where: {
            username: 'journeyTestUser'
        }
    })
})
