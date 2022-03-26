<template>
  <n-data-table
    ref="table"
    :remote="true"
    :columns="columns"
    :data="data"
    striped
    :single-line="false"
    size="large"
    :loading="loading"
    :pagination="pagination"
    :row-key="rowKey"
    @update:page="handlePageChange"
  />
</template>

<script lang="ts">
import { NButton, NDataTable, useMessage } from "naive-ui";
import { defineComponent, h, onMounted, reactive, ref } from "vue";
import { getOrder } from "../apis/order";
import { ordersInfo } from "../data";
import { OrderItem } from "../types/types";

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
      title: "指导价",
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

    const allInfo: OrderItem[] = [];

    const query = (page: number, pageSize = 10): Promise<any> => {
      return new Promise((resolve) => {
        const pagedData = ordersInfo.slice(
          (page - 1) * pageSize,
          page * pageSize
        );
        const pageCount = Math.ceil(ordersInfo.length / pageSize);
        resolve({
          pageCount,
          data: pagedData,
        });
      });
    };

    const handlePageChange = (currentPage: number): void => {
      if (!loadingRef.value) {
        loadingRef.value = true;
        query(currentPage, paginationReactive.pageSize).then((data: any) => {
          dataRef.value = data.data;
          paginationReactive.page = currentPage;
          paginationReactive.pageCount = data.pageCount;
          loadingRef.value = false;
        });
      }
    };
    onMounted(() => {
      getOrder({
        page: paginationReactive.page,
        size: paginationReactive.pageSize,
      }).then((data: any) => {
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
        paginationReactive.pageCount = data.pageNum;
        loadingRef.value = false;
      });
    });

    return {
      data: dataRef,
      columns: columns({
        handleAgree(rowData: any) {
          // console.log(rowData.id);
          message.info("确认上架成功！");
        },
        handleReject(rowData: any) {
          message.info("拒绝上架成功！");
        },
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
