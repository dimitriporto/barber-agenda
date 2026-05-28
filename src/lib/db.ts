import mongoose from "mongoose";

// URI do MongoDB definida no .env.local
const MONGODB_URI = process.env.MONGODB_URI;

// Garante que a variável exista
if (!MONGODB_URI) {
  throw new Error("MONGODB_URI não foi definida.");
}

/*
  Cache global da conexão.
  Evita múltiplas conexões durante o Hot Reload do Next.js.
*/
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

// Função responsável pela conexão com o MongoDB
export async function connectDB() {
  // Retorna conexão existente
  if (cached.conn) {
    return cached.conn;
  }

  // Cria conexão apenas se ainda não existir
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;

  return cached.conn;
}