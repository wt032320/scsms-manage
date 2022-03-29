<template>
  <n-data-table
    ref="table"
    :remote="true"
    :columns="columns"
    :data="data"
    striped
    :single-line="false"
    size="large"
    min-height="75vh"
    :flex-height="true"
    :bordered="true"
    :loading="loading"
    :pagination="pagination"
    :row-key="rowKey"
    @update:page="handlePageChange"
  />
</template>

<script lang="ts">
import { NButton, NDataTable, useMessage } from "naive-ui";
import { warnOnce } from "naive-ui/lib/_utils";
import {
  defineComponent,
  h,
  onMounted,
  onUpdated,
  reactive,
  ref,
  watch,
} from "vue";
import { get } from "../apis";
import { auditOrder, getOrder } from "../apis/order";
import { AuditInfo, OrderItem, OrderList } from "../types/types";

const columns = ({ handleAgree, handleReject }: any): any => {
  return [
    {
      title: "编号",
      key: "id",
      align: "center",
    },
    {
      title: "品牌",
      key: "brand",
      align: "center",
    },
    {
      title: "车系",
      key: "series",
      align: "center",
    },
    {
      title: "款式",
      key: "model",
      align: "center",
    },
    {
      title: "车身结构",
      key: "structure",
      align: "center",
    },
    {
      title: "燃料类型",
      key: "fuel",
      align: "center",
    },
    {
      title: "指导价(万元)",
      key: "price",
      align: "center",
    },
    {
      title: "同意上架",
      key: "agree",
      align: "center",
      render(row: any) {
        return h(
          NButton,
          {
            size: "small",
            type: "success",
            onClick: () => handleAgree(row),
          },
          { default: () => "Agree" }
        );
      },
    },
    {
      title: "拒绝上架",
      key: "argue",
      align: "center",
      render(row: any) {
        return h(
          NButton,
          {
            size: "small",
            type: "error",
            onClick: () => handleReject(row),
          },
          { default: () => "Reject" }
        );
      },
    },
  ];
};

export default defineComponent({
  name: "OrderManage",
  components: { NDataTable },
  setup() {
    const message = useMessage();
    const dataRef = ref<any>([]);
    const loadingRef = ref(true);
    const paginationReactive = reactive({
      page: 1,
      pageCount: 1,
      pageSize: 10,
    });

    const getOrderFun = (page: number, size: number): void => {
      const allInfo: OrderItem[] = [];
      getOrder({ page, size }).then((data: any) => {
        data.data.list.map((item: any) => {
          const orderItem: any = {};
          orderItem.id = item.id;
          orderItem.brand = item.car.brand;
          orderItem.model = item.car.model;
          orderItem.series = item.car.series;
          orderItem.structure = item.car.structure;
          orderItem.fuel = item.car.fuel;
          orderItem.price = item.car.price;
          allInfo.push(orderItem);
        });
        dataRef.value = allInfo;
        paginationReactive.page = data.data.pageNum;
        paginationReactive.pageCount = data.data.pages;
        loadingRef.value = false;
      });
    };

    const getNewOrderFun = (page: number, size: number): void => {
      getOrder({ page, size }).then((data: any) => {
        data.data.list.map((item: any) => {
          const orderItem: any = {};
          orderItem.id = item.id;
          orderItem.brand = item.car.brand;
          orderItem.model = item.car.model;
          orderItem.series = item.car.series;
          orderItem.structure = item.car.structure;
          orderItem.fuel = item.car.fuel;
          orderItem.price = item.car.price;
          activeArr.value.push(orderItem);
        });
      });
    };

    const handlePageChange = (currentPage: number): void => {
      if (!loadingRef.value) {
        loadingRef.value = true;
        getOrderFun(currentPage, paginationReactive.pageSize);
      }
    };
    onMounted(() => {
      getOrderFun(1, 10);
    });
    const activeArr = ref<any>([]);
    const handleAgree = (rowData: any): void => {
      const auditPyload: AuditInfo = {
        saleId: rowData.id,
        publish: "1",
      };
      auditOrder(auditPyload).then((res) => {
        if (res.status === 0) {
          if (activeArr.value.length === 0) {
            getNewOrderFun(
              paginationReactive.page + 1,
              paginationReactive.pageSize
            );
            dataRef.value = dataRef.value.filter(
              (item: any) => item.id !== auditPyload.saleId
            );
          } else {
            dataRef.value = dataRef.value.filter(
              (item: any) => item.id !== auditPyload.saleId
            );
          }
          //console.log(newArr);
          message.info("已通过审核！");
        }
      });
    };
    const handleReject = (rowData: any): void => {
      const auditPyload: AuditInfo = {
        saleId: rowData.id,
        publish: "0",
      };
      auditOrder(auditPyload).then((res) => {
        if (res.status === 0) {
          if (activeArr.value.length === 0) {
            getNewOrderFun(
              paginationReactive.page + 1,
              paginationReactive.pageSize
            );
            dataRef.value = dataRef.value.filter(
              (item: any) => item.id !== auditPyload.saleId
            );
          } else {
            dataRef.value = dataRef.value.filter(
              (item: any) => item.id !== auditPyload.saleId
            );
          }
          message.info("已拒绝上架！");
        }
      });
    };

    return {
      data: dataRef,
      columns: columns({
        handleAgree,
        handleReject,
      }),
      loading: loadingRef,
      pagination: paginationReactive,
      rowKey(rowData: any) {
        return rowData.id;
      },
      handlePageChange,
    };
  },
});
</script>

<style lang="scss"></style>
