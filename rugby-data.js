import axios from "axios"
import { format, parseISO } from 'date-fns'
import { fr } from 'date-fns/locale/index.js'

/**
 * Permet de récupérer et formater les matchs joués
 *
 * @returns Array
 */
export const getPlayedMatches = async () => {
  const matches = await getData("C")

  return matches.map(m => {
    return {
      "teams" : `${m.teams[0].name} / ${m.teams[1].name}`,
      "scores" : `${m.scores[0]} / ${m.scores[1]}`,
      "date": format(parseISO(m.time.label), "dd MMMM yyyy", {locale: fr}),
      "winner" : m.teams[0].name
    }
  })
}


/**
 * Permet de récupérer et formater les matchs programmés
 *
 * @returns Array
 */
export const getScheduldedMatches = async () => {
  const matches = await getData("U")

  return matches.map(m => {
    return {
      "teams" : `${m.teams[0].name} / ${m.teams[1].name}`,
      "date": format(parseISO(m.time.label), "dd MMMM yyyy", {locale: fr})
    }
  })
}


/**
 * Permet de récupérer les matchs selon leur statut
 *
 * @param {String} status Status des matchs à rechercher
 * @returns Array
 */
const getData = async (status) => {
  const url = "https://api.wr-rims-prod.pulselive.com/rugby/v3/event/1893/schedule?language=fr"

  const {data} = await axios.get(url)
  const matches = data.matches.filter(m => m.status === status)

  return matches
}