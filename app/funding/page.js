"use client";
import { useState, useEffect } from "react";
import {
  Button,
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
  useDisclosure,
} from "@heroui/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fundingAPI } from "@/lib/api";
import { getUser } from "@/lib/api/user/user";
import { useRouter } from "next/navigation";
import { getTotalFunding } from "@/lib/api/server/action";

function FundRow({ fund, index }) {
  return (
    <tr className="hover:bg-cream/40 transition-colors">
      <td className="px-5 py-4 text-sm text-ash font-mono">{String(index + 1).padStart(2, "0")}</td>
      <td className="px-5 py-4">
        <p className="font-medium text-charcoal text-sm">{fund.donorName}</p>
      </td>
      <td className="px-5 py-4">
        <span className="font-mono font-bold text-wine text-base">
          ৳{fund.amount.toLocaleString()}
        </span>
      </td>
      <td className="px-5 py-4 text-xs text-ash">{fund.date}</td>
      <td className="px-5 py-4 text-xs text-ash font-mono">{fund.transactionId}</td>
    </tr>
  );
}

export default function FundingPage() {
  const [user, setUser] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [amount, setAmount] = useState("500");
  const [paying, setPaying] = useState(false);
  const [paid, setPaid] = useState(false);
  const router = useRouter();

  useEffect( () => {

    async function checkAuthAndFetchData() {
      try {
        const session = await getUser();
        if (!session?.user) {
          router.replace("/login");
          return;
        }
        setUser(session.user);

        const funding = await getTotalFunding();
        setTotal(funding.funding);

        fundingAPI.getAll().then(({ funds }) => {
          setFunds(funds);
          setLoading(false);
        });

      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
    checkAuthAndFetchData();

  }, []);



  const handlePay = async (e) => {
    e.preventDefault();
    setPaying(true);
    // TODO: integrate real Stripe payment
    // const { clientSecret } = await fundingAPI.createPaymentIntent(Number(amount));
    // Use Stripe Elements or Stripe.js to complete payment
    await new Promise((r) => setTimeout(r, 1200)); // mock delay
    const newFund = {
      _id: `f${Date.now()}`,
      donorName: user.name,
      amount: Number(amount),
      date: new Date().toISOString().slice(0, 10),
      transactionId: `TXN-${Date.now()}`,
    };
    setFunds((prev) => [newFund, ...prev]);
    setTotal((t) => t + Number(amount));
    setPaying(false);
    setPaid(true);
    onClose();
    setTimeout(() => setPaid(false), 4000);
  };

  const PRESET_AMOUNTS = ["100", "250", "500", "1000", "2500", "5000"];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-ivory pt-16 pb-16">
        {/* Header */}
        <div className="bg-cream border-b border-border py-14">
          <div className="max-w-8xl mx-auto px-5 lg:px-10">
            <div className="grid lg:grid-cols-2 gap-8 items-end">
              <div>
                <p className="eyebrow mb-3">Community Funding</p>
                <h1 className="font-display font-medium text-charcoal"
                  style={{ fontSize: "clamp(36px, 5vw, 60px)" }}>
                  Support the
                  <em className="text-wine not-italic"> Mission</em>
                </h1>
                <p className="text-ash text-base mt-4 max-w-lg">
                  Help us maintain a free and reliable platform for all donors and recipients
                  across Bangladesh. Every taka counts.
                </p>
              </div>
              <div className="lg:flex lg:justify-end">
                <div className="bg-wine rounded-2xl p-6 text-ivory max-w-xs w-full">
                  <p className="text-ivory/60 text-sm font-mono">Total Raised</p>
                  <p className="font-mono font-bold text-4xl mt-1">
                    ৳ {total}K
                  </p>
                  <p className="text-ivory/50 text-xs mt-2">{funds.length} contributors</p>
                  <Button
                    onPress={onOpen}
                    className="mt-5 w-full bg-ivory text-wine font-bold rounded-xl hover:bg-cream"
                    size="lg"
                  >
                    Give Fund
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Success banner */}
        {paid && (
          <div className="max-w-8xl mx-auto px-5 lg:px-10 mt-6">
            <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-medium">
              ✓ Thank you for your generous contribution! Your fund has been recorded.
            </div>
          </div>
        )}

        {/* Table */}
        <div className="max-w-8xl mx-auto px-5 lg:px-10 mt-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-charcoal">Fund History</h2>
            <Button onPress={onOpen}
              className="bg-wine text-white font-semibold rounded-full hover:bg-wine-dark">
              + Give Fund
            </Button>
          </div>

          <div className="bg-surface border border-border rounded-2xl overflow-hidden">
            {loading ? (
              <div className="p-8 space-y-3">
                {[1, 2, 3, 4, 5].map((i) => <div key={i} className="h-12 rounded-xl bg-cream animate-pulse" />)}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-cream">
                      {["#", "Contributor", "Amount", "Date", "Transaction ID"].map((h) => (
                        <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-ash
                                               uppercase tracking-wider whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {funds.map((f, i) => <FundRow key={f._id} fund={f} index={i} />)}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />

      {/* Fund modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalContent>
          <ModalHeader className="font-display text-2xl">Give Fund</ModalHeader>
          <ModalBody>
            <form id="fund-form" onSubmit={handlePay} className="space-y-5">
              <div>
                <label className="form-label">Select Amount (BDT)</label>
                <div className="grid grid-cols-3 gap-2 mt-1">
                  {PRESET_AMOUNTS.map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => setAmount(a)}
                      className={`py-2.5 rounded-xl border text-sm font-mono font-semibold
                                  transition-all ${amount === a
                          ? "bg-wine text-white border-wine"
                          : "border-border text-ash hover:border-wine/40"}`}
                    >
                      ৳{Number(a).toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="form-label">Custom Amount</label>
                <div className="relative flex">
                  <span className="absolute left-1.5 top-1/2 -translate-y-1/2 text-ash font-mono">৳</span>
                  <input
                    type="number"
                    min="10"
                    className="form-input pl-8"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-cream border border-border text-xs text-ash">
                <p className="font-semibold text-charcoal mb-1">🔒 Secure Payment via Stripe</p>
                <p>Your payment is encrypted and processed securely. Vitae never stores your card details.</p>
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onClose}>Cancel</Button>
            <Button
              type="submit"
              form="fund-form"
              isLoading={paying}
              className="bg-wine text-white font-semibold"
            >
              Pay ৳{Number(amount || 0).toLocaleString()}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
