// @vitest-environment node
import { faker } from '@faker-js/faker'
import { $fetch, setup } from '@nuxt/test-utils'
import { PrismaClient } from '@prisma/client'
import dayjs from 'dayjs'
import { describe, expect, it } from 'vitest'

const prisma = new PrismaClient()

await setup({
  server: true,
  browser: false
})

describe('GET /api/healthz', () => {
  it('should return the current health status', async () => {
    const response = await $fetch('/api/healthz')
    expect(Object.keys(response).sort()).toEqual(['nuxtAppVersion', 'startupTime', 'status', 'time'].sort())

    expect(response.nuxtAppVersion).toEqual('0.0.1')
    expect(response.status).toEqual('healthy')

    expect(dayjs(response.startupTime).isValid()).toBe(true)
    expect(dayjs(response.time).isValid()).toBe(true)
    expect(dayjs(response.startupTime) < dayjs(response.time))
  })
})

describe('/api/example/:id', () => {
  it('GET returns 404 when id does not exist', async () => {
    const result = await $fetch('/api/example/1', {}).catch(error => error.data)
    expect(result).toStrictEqual({
      message: 'Failed to find example with id 1',
      stack: '',
      statusCode: 404,
      statusMessage: 'Failed to find example with id 1',
      url: '/api/example/1'
    })
  })

  it('PUT creates an entity, then GET allows to fetch it', async () => {
    // 1. Create the entity and assert that it has the correct shape & values
    const exampleToCreate: prisma.ExampleCreateInput = {
      description: faker.lorem.paragraph(),
      details: faker.lorem.paragraphs()
    }

    const exampleAfterUpsert = await $fetch(`/api/example/${faker.string.uuid()}`, {
      method: 'PUT',
      body: exampleToCreate
    })

    expect(Object.keys(exampleAfterUpsert).sort()).toEqual(['id', 'description', 'details'].sort())
    expect(exampleAfterUpsert.details).toBe(exampleToCreate.details)
    expect(exampleAfterUpsert.description).toBe(exampleToCreate.description)

    // 2. Fetch the entity from the GET endpoint
    const exampleFromGet = await $fetch(`/api/example/${exampleAfterUpsert.id}`)

    expect(exampleFromGet).toStrictEqual(exampleAfterUpsert)
  })

  it('PUT creates an entity if none exists, then updates it on a second call', async () => {
    // 1. Create the entity and assert that it has the correct shape & values
    const exampleToCreate: prisma.ExampleCreateInput = {
      description: faker.lorem.paragraph(),
      details: faker.lorem.paragraphs()
    }

    const exampleAfterUpsert = await $fetch(`/api/example/${faker.string.uuid()}`, {
      method: 'PUT',
      body: exampleToCreate
    })

    expect(Object.keys(exampleAfterUpsert).sort()).toEqual(['id', 'description', 'details'].sort())
    expect(exampleAfterUpsert.details).toBe(exampleToCreate.details)
    expect(exampleAfterUpsert.description).toBe(exampleToCreate.description)

    // 2. Update the entity and check if the value has changed
    const updatePayload: prisma.ExampleUpdateInput = { description: faker.lorem.paragraphs(), details: faker.lorem.paragraphs() }
    const exampleAfterUpdate = await $fetch(`/api/example/${faker.string.uuid()}`, {
      method: 'PUT',
      body: updatePayload
    })

    expect(exampleAfterUpdate.description).toBe(updatePayload.description)
    expect(exampleAfterUpdate.details).toBe(updatePayload.details)
  })

  it('PUT throws errors for invalid data', async () => {
    // 1. Create the entity and assert that it has the correct shape & values
    const exampleToCreate: prisma.ExampleCreateInput = {
      description: faker.lorem.paragraph(),
      details: faker.lorem.paragraphs()
    }

    const exampleAfterUpsert = await $fetch('/api/example/1', {
      method: 'PUT',
      body: exampleToCreate
    })

    expect(Object.keys(exampleAfterUpsert).sort()).toEqual(['id', 'description', 'details'].sort())
    expect(exampleAfterUpsert.details).toBe(exampleToCreate.details)
    expect(exampleAfterUpsert.description).toBe(exampleToCreate.description)
  })
})
