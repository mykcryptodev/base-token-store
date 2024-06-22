import {
  fulfillAdvancedOrder,
  fulfillAvailableAdvancedOrders,
  fulfillAvailableOrders,
  fulfillBasicOrder,
  fulfillBasicOrder_efficient_6GL6yc,
  fulfillOrder,
} from '~/thirdweb/8453/0x00000000000000adc04c56bf30ac9d3c0aaf14dc';

export const seaport2: {
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
  fulfillOrder,
};

export const seaport2Address = '0x00000000000000adc04c56bf30ac9d3c0aaf14dc';