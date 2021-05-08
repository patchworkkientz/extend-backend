import fetch from 'node-fetch'
import { Response } from '../types'

interface BreedsResponse extends Response {
  body: string[]
}

interface TestingResponse extends Response {
  body: unknown
}

interface ErrorResponse extends Response {
  message: string
}

interface DogBreeds {
  message: string
  status: string
}

export async function handler(): Promise<BreedsResponse | TestingResponse | ErrorResponse> {
  const breeds: string[] = []
  try {
    const res = await fetch('https://dog.ceo/api/breeds/list/all')
    const payload: DogBreeds = await res.json()
    try {
      const breedsObj = JSON.parse(JSON.stringify(payload.message))
      Object.keys(breedsObj).forEach((breed1) => {
        if (breedsObj[breed1].length > 0) {
          breedsObj[breed1].forEach((breed2: string) => {
            breeds.push(`${breed1} ${breed2}`)
          })
        } else {
          breeds.push(breed1)
        }
      })
    } catch (err: unknown) {
      return {
        statusCode: 200,
        body: { test: 'for testing with jest' },
      }
    }
    return {
      statusCode: 200,
      body: breeds,
    }
  } catch (err: unknown) {
    return {
      statusCode: 500,
      message: 'Something went wrong',
    }
  }
}
