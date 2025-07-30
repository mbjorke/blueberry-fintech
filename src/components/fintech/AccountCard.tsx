import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Plus, Send, ArrowDownLeft } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * AccountCard Component
 * 
 * Displays the user's main account balance with quick action buttons.
 * Features balance visibility toggle and primary financial actions.
 * Enhanced with Framer Motion animations for smooth interactions.
 * 
 * Props:
 * - balance: Account balance (number)
 * - currency: Currency symbol (string, default: "£")
 * - accountName: Display name for the account (string, default: "Main Account")
 * - onAddMoney: Callback for add money action
 * - onSendMoney: Callback for send money action
 * - onRequestMoney: Callback for request money action
 */

interface AccountCardProps {
  balance: number;
  currency?: string;
  accountName?: string;
  onAddMoney?: () => void;
  onSendMoney?: () => void;
  onRequestMoney?: () => void;
}

export const AccountCard = ({ 
  balance, 
  currency = "£", 
  accountName = "Main Account",
  onAddMoney,
  onSendMoney,
  onRequestMoney
}: AccountCardProps) => {
  const [showBalance, setShowBalance] = useState(true);

  const formatBalance = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      backgroundColor: "rgba(255, 255, 255, 0.25)",
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -2 }}
    >
      <Card className="bg-gradient-primary text-white p-6 shadow-premium border-0 cursor-pointer">
        <div className="space-y-6">
          {/* Account Header */}
          <div className="flex items-center justify-between">
            <div>
              <motion.p 
                className="text-white/80 text-sm font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {accountName}
              </motion.p>
                <div className="flex items-center gap-3 mt-2">
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={showBalance ? 'visible' : 'hidden'}
                      className="text-3xl font-bold"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {showBalance ? (
                        `${currency}${formatBalance(balance)}`
                      ) : (
                        "••••••"
                      )}
                    </motion.div>
                  </AnimatePresence>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowBalance(!showBalance)}
                    className="text-white hover:bg-white/10 h-8 w-8"
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={showBalance ? 'hide' : 'show'}
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {showBalance ? <EyeOff size={16} /> : <Eye size={16} />}
                      </motion.div>
                    </AnimatePresence>
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <motion.div 
            className="flex gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <motion.div className="flex-1" variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={onAddMoney}
                className="w-full bg-white/20 text-white border-0 hover:bg-white/30"
              >
                <Plus size={16} />
                Add
              </Button>
            </motion.div>
            <motion.div className="flex-1" variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={onSendMoney}
                className="w-full bg-white/20 text-white border-0 hover:bg-white/30"
              >
                <Send size={16} />
                Send
              </Button>
            </motion.div>
            <motion.div className="flex-1" variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={onRequestMoney}
                className="w-full bg-white/20 text-white border-0 hover:bg-white/30"
              >
                <ArrowDownLeft size={16} />
                Request
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
};