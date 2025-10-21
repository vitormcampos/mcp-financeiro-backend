import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ListComponent } from '../../components/cashflow/list/list.component';
import { ChatAiComponent } from '../../components/chat-ai/chat-ai.component';
import { CashflowStore } from '../../stores/cashflow.store';

@Component({
  selector: 'app-dashboard',
  imports: [ListComponent, CurrencyPipe, ChatAiComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  private readonly cashFlowStore = inject(CashflowStore);

  cashFlows = toSignal(this.cashFlowStore.get(), { initialValue: [] });

  income = computed(() => {
    return this.cashFlows().filter((cf) => cf.type === 'INCOME');
  });

  expense = computed(() => {
    return this.cashFlows().filter((cf) => cf.type === 'EXPENSE');
  });

  investment = computed(() => {
    return this.cashFlows().filter((cf) => cf.type === 'INVESTMENT');
  });

  totalIncome = computed(() => {
    return this.income().reduce((acc, curr) => acc + curr.amount, 0);
  });

  totalExpense = computed(() => {
    return this.expense().reduce((acc, curr) => acc + curr.amount, 0);
  });

  totalInvestment = computed(() => {
    return this.investment().reduce((acc, curr) => acc + curr.amount, 0);
  });
}
