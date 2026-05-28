-- CreateTable
CREATE TABLE "Ispitivanje" (
    "id" SERIAL NOT NULL,
    "visina" DOUBLE PRECISION,
    "sirina" DOUBLE PRECISION,
    "sila" DOUBLE PRECISION,
    "cvrstoca" DOUBLE PRECISION,
    "datumIspitivanja" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uzorakId" INTEGER NOT NULL,

    CONSTRAINT "Ispitivanje_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ispitivanje_uzorakId_key" ON "Ispitivanje"("uzorakId");

-- AddForeignKey
ALTER TABLE "Ispitivanje" ADD CONSTRAINT "Ispitivanje_uzorakId_fkey" FOREIGN KEY ("uzorakId") REFERENCES "Uzorak"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
