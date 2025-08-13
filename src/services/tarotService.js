// URL base de la API
const API_BASE_URL = 'https://6872278c76a5723aacd3cbb3.mockapi.io/api/v1/tarot'

/**
 * Obtiene todas las cartas del tarot
 * @returns {Promise<Array>} Array con todas las cartas
 */
export const getAllCards = async () => {
  try {
    const response = await fetch(API_BASE_URL)
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error al obtener las cartas:', error)
    throw error
  }
}

/**
 * Obtiene una carta específica por su ID
 * @param {string} id - ID de la carta a obtener
 * @returns {Promise<Object>} Datos de la carta solicitada
 */
export const getCardById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`)
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error(`Error al obtener la carta con ID ${id}:`, error)
    throw error
  }
}

/**
 * Obtiene tres cartas aleatorias para la lectura
 * @returns {Promise<Array>} Array con tres cartas aleatorias
 */
export const getRandomCards = async (count = 3) => {
  try {
    const allCards = await getAllCards()
    const shuffled = allCards.sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  } catch (error) {
    console.error('Error al obtener cartas aleatorias:', error)
    throw error
  }
}
