-- CreateTable
CREATE TABLE "Nalog" (
    "id" SERIAL NOT NULL,
    "brojRadnogNaloga" TEXT NOT NULL,
    "narucitelj" TEXT NOT NULL,
    "gradiliste" TEXT NOT NULL,
    "datum" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Nalog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Uzorak" (
    "id" SERIAL NOT NULL,
    "laboratorijskaOznaka" TEXT NOT NULL,
    "lokacija" TEXT NOT NULL,
    "nalogId" INTEGER NOT NULL,

    CONSTRAINT "Uzorak_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Uzorak_laboratorijskaOznaka_key" ON "Uzorak"("laboratorijskaOznaka");

-- AddForeignKey
ALTER TABLE "Uzorak" ADD CONSTRAINT "Uzorak_nalogId_fkey" FOREIGN KEY ("nalogId") REFERENCES "Nalog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
