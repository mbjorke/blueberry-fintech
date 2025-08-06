import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";

/**
 * SpendingInsights Component
 * 
 * Displays spending analytics with category breakdowns, budgets,
 * and spending trends. Helps users understand their financial habits.
 * 
 * Props:
 * - monthlyBudget: Total monthly budget amount
 * - spent: Amount spent this month
 * - currency: Currency symbol (default: "£")
 * - categories: Array of spending categories with amounts
 * - trend: Spending trend compared to last month
 * - onViewDetails: Callback for viewing detailed analytics
 */

interface SpendingCategory {
  name: string;
  amount: number;
  budget: number;
  color: string;
  icon?: string;
}

interface SpendingInsightsProps {
  monthlyBudget: number;
  spent: number;
  currency?: string;
  categories: SpendingCategory[];
  trend: {
    percentage: number;
    direction: 'up' | 'down';
  };
  onViewDetails?: () => void;
}

export const SpendingInsights = ({
  monthlyBudget,
  spent,
  currency = "£",
  categories,
  trend,
  onViewDetails,
}: SpendingInsightsProps) => {
  const remainingBudget = monthlyBudget - spent;
  const budgetProgress = (spent / monthlyBudget) * 100;
  
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getBudgetStatus = () => {
    if (budgetProgress >= 100) return 'over';
    if (budgetProgress >= 80) return 'warning';
    return 'good';
  };

  const statusColors = {
    good: 'text-success',
    warning: 'text-warning',
    over: 'text-destructive',
  };

  const progressColors = {
    good: 'bg-success',
    warning: 'bg-warning',
    over: 'bg-destructive',
  };

  const budgetStatus = getBudgetStatus();

  return (
    <Card className="bg-card/80 backdrop-blur-lg border border-border text-foreground p-6 shadow-card">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Spending Insights</h3>
            <p className="text-sm text-muted-foreground">This month's overview</p>
          </div>
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-1 ${trend.direction === 'up' ? 'text-error' : 'text-success'}`}>
              {trend.direction === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              <span className="text-sm font-medium">{trend.percentage}%</span>
            </div>
          </div>
        </div>

        {/* Budget Overview */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-foreground">
                {currency}{formatAmount(spent)}
              </p>
              <p className="text-sm text-muted-foreground">
                of {currency}{formatAmount(monthlyBudget)} budget
              </p>
            </div>
            <div className="text-right">
              <p className={`text-sm font-medium ${budgetStatus === 'good' ? 'text-success' : budgetStatus === 'warning' ? 'text-warning' : 'text-error'}`}>
                {currency}{formatAmount(Math.abs(remainingBudget))} {remainingBudget >= 0 ? 'left' : 'over'}
              </p>
              <Badge 
                variant={budgetStatus === 'good' ? 'default' : budgetStatus === 'warning' ? 'outline' : 'destructive'}
                className="text-xs"
              >
                {Math.round(budgetProgress)}% used
              </Badge>
            </div>
          </div>
          
          <Progress 
            value={Math.min(budgetProgress, 100)} 
            className="h-2 bg-background"
          />
        </div>

        {/* Category Breakdown */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">Top Categories</h4>
          <div className="space-y-3">
            {categories.slice(0, 4).map((category, index) => {
              const categoryProgress = (category.amount / category.budget) * 100;
              
              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full bg-background"
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="text-sm font-medium text-foreground">{category.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">
                        {currency}{formatAmount(category.amount)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        of {currency}{formatAmount(category.budget)}
                      </p>
                    </div>
                  </div>
                  <Progress 
                    value={Math.min(categoryProgress, 100)} 
                    className="h-1.5 bg-background"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* View Details Button */}
        {onViewDetails && (
          <button
            onClick={onViewDetails}
            className="w-full flex items-center justify-center gap-2 text-sm text-primary hover:bg-card/20 hover:text-primary/80 transition-colors py-2"
          >
            View detailed analytics
            <ArrowRight size={16} />
          </button>
        )}
      </div>
    </Card>
  );
};