import { 
  fulfillAdvancedOrder, 
  fulfillAvailableAdvancedOrders, 
  fulfillAvailableOrders,
  fulfillBasicOrder, 
  fulfillBasicOrder_efficient_6GL6yc, 
  fulfillOrder
} from '~/thirdweb/8453/0x0000000000000068f116a894984e2db1123eb395';

export const seaport1: {
  fulfillAdvancedOrder: typeof fulfillAdvancedOrder,
  fulfillAvailableAdvancedOrders: typeof fulfillAvailableAdvancedOrders,
  fulfillAvailableOrders: typeof fulfillAvailableOrders,
  fulfillBasicOrder: typeof fulfillBasicOrder,
  fulfillBasicOrder_efficient_6GL6yc: typeof fulfillBasicOrder_efficient_6GL6yc,
  fulfillOrder: typeof fulfillOrder
} = {
  fulfillAdvancedOrder,
  fulfillAvailableAdvancedOrders,
  fulfillAvailableOrders,
  fulfillBasicOrder,
  fulfillBasicOrder_efficient_6GL6yc,
  fulfillOrder
};

export const seaport1Address = '0x0000000000000068f116a894984e2db1123eb395';