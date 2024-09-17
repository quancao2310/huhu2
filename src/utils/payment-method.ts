import OptionAtDelivery from '../../public/ui/option-at-delivery.jpg';
import OptionBank from '../../public/ui/option-bank.jpg';
import OptionMomo from '../../public/ui/option-momo.jpg';
interface PaymentMethodOptionsProps {
  label: string;
  value: string;
  image: string;
}

export const paymentMethodOptions = [
  {
    label: 'Thanh toán khi nhận hàng',
    value: 'AT_DELIVERY',
    image: OptionAtDelivery
  },
  {
    label: 'Thanh toán qua ngân hàng',
    value: 'BANK',
    image: OptionBank
  },
  {
    label: 'Qua Momo',
    value: 'Momo',
    image: OptionMomo
  }
] as unknown as PaymentMethodOptionsProps[];
