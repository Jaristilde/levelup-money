import { Card } from '@/components/ui/card';

interface CreditCardVisualProps {
  cardName: string;
  lastFour: string;
  balance: number;
  limit: number;
  gradient: string;
  brand: 'visa' | 'mastercard' | 'amex' | 'discover';
}

export const CreditCardVisual = ({
  cardName,
  lastFour,
  balance,
  limit,
  gradient,
  brand,
}: CreditCardVisualProps) => {
  const utilization = (balance / limit) * 100;
  
  return (
    <Card className={`group relative h-60 w-full overflow-hidden bg-gradient-to-br ${gradient} p-6 shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer border-0`}>
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      
      {/* Card chip */}
      <div className="mb-8 h-12 w-16 rounded-lg bg-gradient-to-br from-amber-200 to-amber-400 shadow-lg" />
      
      {/* Card number */}
      <p className="mb-8 font-mono text-xl tracking-[0.25em] text-white/90">
        •••• •••• •••• {lastFour}
      </p>
      
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs text-white/60 mb-1 font-medium">Balance</p>
          <p className="text-2xl font-bold text-white">${balance.toLocaleString()}</p>
        </div>
        
        <div className="text-right">
          <p className="text-xs text-white/60 mb-1 font-medium">Limit</p>
          <p className="text-sm font-semibold text-white mb-2">${limit.toLocaleString()}</p>
          <div className="h-1.5 w-24 overflow-hidden rounded-full bg-white/20">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ${
                utilization < 30 ? 'bg-emerald-400' :
                utilization < 50 ? 'bg-yellow-400' :
                'bg-red-400'
              }`}
              style={{ width: `${utilization}%` }}
            />
          </div>
          <p className="text-xs text-white/80 mt-1">{utilization.toFixed(1)}% used</p>
        </div>
      </div>
      
      {/* Card brand */}
      <div className="absolute bottom-6 right-6">
        <div className="text-2xl font-bold text-white/90 tracking-wider">
          {brand.toUpperCase()}
        </div>
      </div>
      
      {/* Card name */}
      <div className="absolute top-6 right-6">
        <p className="text-xs text-white/60 mb-1">Card</p>
        <p className="text-sm font-semibold text-white">{cardName}</p>
      </div>
    </Card>
  );
};
