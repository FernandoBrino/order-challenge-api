-- CreateTable
CREATE TABLE "orders" (
    "orderId" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("orderId")
);

-- CreateTable
CREATE TABLE "items" (
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "orderId" TEXT NOT NULL,

    CONSTRAINT "items_pkey" PRIMARY KEY ("productId")
);

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("orderId") ON DELETE RESTRICT ON UPDATE CASCADE;
