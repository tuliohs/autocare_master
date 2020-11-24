const URL = 'https://southamerica-east1-autocare-293023.cloudfunctions.net'

export function getTipos() {
   return fetch(`${URL}/tipos`, {method: 'POST'})
      .then(res => res.json())
      .catch(err => {
        console.log('Erro ao executar a consulta de tipos: ', err)
        return []
      });
}

export function getMarcas(tipo) {
  return fetch(`${URL}/marcas?tipo=${tipo}`)
          .then(res => res.json())
          .catch(err => {
            console.log('Erro ao executar a consulta de marcas', err)
            return []
          })
}

export function getModelos(tipo, marca) {
  return fetch(`${URL}/modelos?tipo=${tipo}&marca=${marca}`)
          .then(res => res.json())
          .catch(err => {
            console.log('Erro ao executar a consulta de modelos', err)
            return []
          })
}