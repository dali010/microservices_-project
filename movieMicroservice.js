// movieMicroservice.js
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
// Charger le fichier movie.proto
const movieProtoPath = 'movie.proto';
const movieProtoDefinition = protoLoader.loadSync(movieProtoPath, {
keepCase: true,
longs: String,
enums: String,
defaults: true,
oneofs: true,
});
const movieProto = grpc.loadPackageDefinition(movieProtoDefinition).movie;
// Implémenter le service movie
const movieService = {
getMovie: (call, callback) => {
// Récupérer les détails du film à partir de la base de données
const movie = {
id: call.request.movie_id,
title: 'To Kill a Mockingbird',
description: 'dddddd',
// Ajouter d'autres champs de données pour le film au besoin
};
callback(null, { movie });
},
searchMovies: (call, callback) => {
const { query } = call.request;
// Effectuer une recherche de films en fonction de la requête
const movies = [
{
id: '1',
title: 'To Kill a Mockingbird',
description: 'To Kill a Mockingbird is a novel by the American author Harper Lee. It was published in June 1960 and became instantly successful. In the United States, it is widely read in high schools and middle school',
},
{
id: '2',
title: 'The Great Gatsby',
description: 'The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, near New York City, the novel depicts first-person narrator Nick Carraways interactions with mysterious millionaire Jay Gatsby and Gatsbys obsession to reunite with his former lover, Daisy Buchanan.',
},
// Ajouter d'autres résultats de recherche de films au besoin
];
callback(null, { movies });
},
// Ajouter d'autres méthodes au besoin
};
// Créer et démarrer le serveur gRPC
const server = new grpc.Server();
server.addService(movieProto.MovieService.service, movieService);
const port = 50051;
server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(),
(err, port) => {
if (err) {
console.error('Échec de la liaison du serveur:', err);
return;
}
console.log(`Le serveur s'exécute sur le port ${port}`);
server.start();
});
console.log(`Microservice de films en cours d'exécution sur le port ${port}`);