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
import { DataTableColumn, NButton, NDataTable, useMessage } from "naive-ui";
import { defineComponent, h, onMounted, reactive, ref } from "vue";
import { ordersInfo } from "../data";

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
      title: "车身结构",
      key: "structure",
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
    const dataRef = ref([]);
    const loadingRef = ref(true);
    // const columnsRef = ref(columns);
    const paginationReactive = reactive({
      page: 1,
      pageCount: 1,
      pageSize: 10,
    });
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
      query(paginationReactive.page, paginationReactive.pageSize).then(
        (data: any) => {
          dataRef.value = data.data;
          paginationReactive.pageCount = data.pageCount;
          loadingRef.value = false;
        }
      );
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
