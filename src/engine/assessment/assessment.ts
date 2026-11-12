import { PerformanceAssessment, SimulationState } from '@/types/simulation';

export class AssessmentEngine {
  public static evaluate(state: SimulationState): PerformanceAssessment {
    const { business, orders, machines, inventory, production, status } = state;

    // Financial Metrics
    const finalCash = business.cash;
    const netProfit = business.profit;
    const revenue = business.revenue;
    const profitMargin = revenue > 0 ? Math.round((netProfit / revenue) * 100) : 0;

    // Order Fulfillment
    const totalOrders = orders.length;
    const fulfilledOrders = orders.filter(o => o.status === 'FULFILLED').length;
    const failedOrders = orders.filter(o => o.status === 'EXPIRED').length;
    const fulfillmentRate = totalOrders > 0 ? Math.round((fulfilledOrders / totalOrders) * 100) : 0;

    // Operations & Utilization
    const machineUtilizationAvg = production.utilizationRate;
    const capitalEfficiency = revenue > 0 ? Math.round((revenue / Math.max(1, business.expenses + 50000)) * 100) / 100 : 0;

    // Calculate Provisional Score (0 - 100)
    let score = 50; // base score

    if (status === 'FAILED') {
      score = Math.max(10, Math.min(35, 20 + (fulfilledOrders * 5)));
    } else {
      // Profitability points (up to 30)
      if (netProfit > 20000) score += 30;
      else if (netProfit > 10000) score += 22;
      else if (netProfit > 0) score += 15;
      else score -= 15;

      // Fulfillment points (up to 35)
      score += Math.round((fulfillmentRate / 100) * 35);

      // Cash health points (up to 15)
      if (finalCash >= 100000) score += 15;
      else if (finalCash >= 70000) score += 10;
      else if (finalCash >= 40000) score += 5;
      else score -= 5;

      // Penalties for failed orders
      score -= (failedOrders * 15);

      // Bonus for inventory / asset management
      if (inventory.finishedGoods.quantity > 0 || inventory.rawMaterials.quantity > 500) {
        score += 5;
      }
    }

    score = Math.max(0, Math.min(100, Math.round(score)));

    // Assign Letter Grade
    let grade: PerformanceAssessment['grade'] = 'C';
    let strategicRating = 'Balanced Operator';

    if (status === 'FAILED') {
      grade = 'F';
      strategicRating = 'Insolvent / Liquidation';
    } else if (score >= 90) {
      grade = 'A+';
      strategicRating = 'Master Industrial Strategist';
    } else if (score >= 80) {
      grade = 'A';
      strategicRating = 'High-Efficiency Operations Leader';
    } else if (score >= 70) {
      grade = 'B';
      strategicRating = 'Prudent Production Manager';
    } else if (score >= 55) {
      grade = 'C';
      strategicRating = 'Developing Operations Planner';
    } else {
      grade = 'D';
      strategicRating = 'Under-Utilized Manufacturer';
    }

    // Determine Strengths
    const strengths: string[] = [];
    if (fulfilledOrders >= 2) {
      strengths.push('Flawless order fulfillment across multiple client contracts');
    } else if (fulfilledOrders === 1) {
      strengths.push('Successfully completed anchor client delivery on schedule');
    }

    if (netProfit > 15000) {
      strengths.push(`Exceptional profitability generating $${netProfit.toLocaleString()} net surplus`);
    } else if (netProfit > 0) {
      strengths.push('Maintained positive operating margin and healthy cash reserves');
    }

    if (machines.length > 1) {
      strengths.push('Smart capital expenditure: Expanded factory throughput to capture market opportunities');
    }

    if (inventory.rawMaterials.quantity > 800) {
      strengths.push('Disciplined supply chain buffering without inventory stockouts');
    }

    if (strengths.length === 0) {
      strengths.push('Maintained factory operations throughout the trial period');
    }

    // Determine Improvement Areas
    const areasForImprovement: string[] = [];
    if (failedOrders > 0) {
      areasForImprovement.push(`Defaulted on ${failedOrders} customer order(s) due to capacity bottlenecks`);
    }

    if (netProfit < 5000) {
      areasForImprovement.push('Operating margins squeezed by high overhead relative to unit output');
    }

    if (machines.length === 1 && orders.some(o => o.status === 'REJECTED' || o.status === 'EXPIRED')) {
      areasForImprovement.push('Conservative machine allocation constrained potential growth during demand surges');
    }

    if (inventory.rawMaterials.quantity < 300 && status !== 'FAILED') {
      areasForImprovement.push('Raw material safety stocks dropped dangerously close to total plant shutdown');
    }

    if (areasForImprovement.length === 0) {
      areasForImprovement.push('Consider testing aggressive machine scaling in high-difficulty scenarios');
    }

    let feedback = '';
    if (grade === 'A+' || grade === 'A') {
      feedback = 'Outstanding management execution. You successfully balanced capital investment, production scaling, and inventory scheduling to fulfill customer commitments profitably.';
    } else if (grade === 'B' || grade === 'C') {
      feedback = 'Solid operational foundation. You delivered key commitments, though refining machine purchase timing and raw material reorder schedules would significantly increase bottom-line profit.';
    } else {
      feedback = 'Challenging operating run. Capacity constraints or supply bottlenecks caused missed contract deadlines. In future runs, monitor daily bottle requirements against machine throughput.';
    }

    return {
      overallScore: score,
      grade,
      strategicRating,
      strengths,
      areasForImprovement,
      metrics: {
        finalCash: Math.round(finalCash),
        netProfit: Math.round(netProfit),
        profitMargin,
        orderFulfillmentRate: fulfillmentRate,
        capitalEfficiency,
        machineUtilizationAvg,
        inventoryTurnoverEstimate: Math.round((production.totalUnitsProduced / Math.max(1, inventory.finishedGoods.quantity + inventory.rawMaterials.quantity)) * 10) / 10,
      },
      feedback,
      provisionalNote: 'Provisional prototype assessment model for formative feedback. Final scoring rubrics and percentile benchmarks are institutionally configurable.',
    };
  }
}
