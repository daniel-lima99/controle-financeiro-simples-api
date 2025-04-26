-- CreateTable
CREATE TABLE "transacao" (
    "id" SERIAL NOT NULL,
    "tipo" VARCHAR(255) NOT NULL,
    "valor" DECIMAL(10,2) NOT NULL,
    "descricao" VARCHAR(255) NOT NULL,
    "data" DATE DEFAULT CURRENT_TIMESTAMP,
    "categoria" VARCHAR(255) NOT NULL,

    CONSTRAINT "transacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "saldo" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "valor" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "saldo_pkey" PRIMARY KEY ("id")
);
