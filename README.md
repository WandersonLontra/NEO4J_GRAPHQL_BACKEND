# PRE CONFIGURAÇÃO

* É necessário instalar o NEO4J-Desktop e setar as credenciar no arquivo ".env".
* É necessário também, instalar os plugins "APOC" e "Graph Data Science Library" para algorítimo de recomendação

## Exemplos de Queries e Mutations

```gql
query Movies($where: MovieWhere) {
  movies(where: $where) {
    title
    genres {
      name
    }
    similarMovies {
      title
      imdbRating
      genres {
        name
      }
    }
  }
}
# Variables
# {
#   "where": {
#     "title": "The Matrix"
#   }
# }

mutation createMovies {
    createMovies(
        input: [{ title: "The Matrix", year: 1999, imdbRating: 8.7 }]
    ) {
        movies {
            title
        }
    }
}

mutation CreateUsers($input: [UserCreateInput!]!) {
  createUsers(input: $input) {
    users {
      name
      ratedConnection {
        edges {
          movieTitle
          rating
        }
      }
    }
  }
}

# {
#   "input": [
#     {
#       "_id": "2",
#       "name": "Rodrigo",
#       "rated": {
#         "connect": [
#           {
#             "where": {
#               "node": {
#                 "title": "The Matrix Reloaded"
#               }
#             },
#             "edge": {
#               "movieTitle": "The Matrix Reloaded",
#               "rating": 7.1
#             }
#           }
#         ]
#       }
#     }
#   ]
# }

query userQueries($limit: Int) {
  users {
    _id
    name
    recommendedMovies(limit: $limit) {
      title
      imdbRating
      genres {
        name
      }
    }
    ratedConnection {
      edges {
        node {
          title
          year
        }
        rating
      }
    }
  }
}

# {
#   "limit": 3
# }

```
