<template>
  <div>
    <div class="toolbox">
      <button @click="updateFirstRow">Update first row</button>
      <button @click="changeZoomLevel">Change zoom level</button>
    </div>
    <div ref="gstc" class="gstc-wrapper"></div>
  </div>
</template>

<script>
import GSTC from 'gantt-schedule-timeline-calendar'
import { Plugin as TimelinePointer } from 'gantt-schedule-timeline-calendar/dist/plugins/timeline-pointer.esm.min.js'
import { Plugin as Selection } from 'gantt-schedule-timeline-calendar/dist/plugins/selection.esm.min.js'
import { Plugin as ItemResizing } from 'gantt-schedule-timeline-calendar/dist/plugins/item-resizing.esm.min.js'
import { Plugin as ItemMovement } from 'gantt-schedule-timeline-calendar/dist/plugins/item-movement.esm.min.js'
import { Plugin as Bookmarks } from 'gantt-schedule-timeline-calendar/dist/plugins/time-bookmarks.esm.min.js'
import 'gantt-schedule-timeline-calendar/dist/style.css'
let gstc, state
// helper functions
/**
 * @returns { import("gantt-schedule-timeline-calendar").Rows }
 */
function generateRows() {
  const rows = {}
  for (let i = 0; i < 10; i++) {
    const id = GSTC.api.GSTCID(i.toString())
    rows[id] = {
      id,
      label: `Row ${i}`,
    }
  }
  return rows
}
/**
 * @returns { import("gantt-schedule-timeline-calendar").Items }
 */
function generateItems() {
  const items = {}
  let start = GSTC.api.date().startOf('day').subtract(6, 'day')
  for (let i = 0; i < 10; i++) {
    const id = GSTC.api.GSTCID(i.toString())
    const rowId = GSTC.api.GSTCID(Math.floor(Math.random() * 10).toString())
    start = start.add(1, 'day')
    items[id] = {
      id,
      label: `Item ${i}`,
      rowId,
      time: {
        start: start.valueOf(),
        end: start.add(1, 'day').endOf('day').valueOf(),
      },
    }
  }
  return items
}
// main component
export default {
  name: 'GSTC',
  props: ['etapas'],
  mounted() {
    /**
     * @type { import("gantt-schedule-timeline-calendar").Config }
     */
    const config = {
      licenseKey:
        '====BEGIN LICENSE KEY====\nAmi1e4QE43vDba+J3ECcL1v76QKc8ViIM0NcxdLWgSCyZIYNmaUhivCsqXn5oggjH/b/STUmsnaJERbMfVisRu/z6eGu5xLTJvwI0DcIKkrQB9kTGyWo48iBBC377BUCT0BIZGeotLK+EG7RzPvIv87kMpcmxLYApCD17Wl4NGyX7Kil3dRXiCNM1jCVAcsn4YjKxSPWjiiqn0Tw5QyTyKi0jx7uzPz+UygU4VJhiIYmvVx2vQdd4MEK4+xVIuXgIzzTp6C6u+uLrdXF6S5fJgQudUR+9TgExDhpDgsrF0rIYkrbBJZwzIG4meIvSmCJ8v0aEq4+ez8S4PEZvZp5Ig==||U2FsdGVkX18KdnWFK7qDVyjpUC+PNJWz43GTzVYIAhBJPTakBjTK3/boj9fwqdp6iaVYj5HSw4rS/e27lS+IpKp13gwjpA1RXpD6YcSynI4=\npy+P2660BYq+pm7mpL9epyAK5E4mayLaE80tFOEG0N63qp1PijDJka8wL2Onk1ljrbcFrGHDwRihZRgSD88dfqACscqQpG5cnyx4/WViDuKCLwrmixKC0I5SK+Ns7NCn5bICcBMrNjFWCPuT4VPF502VZp11Kqjt5t5NatbON58nFZtCUl/kUp7TkfO2Atqg30tTWnBmwUjXFc1af3IRHWrtIrZQUOIU0qEsgs4Szt37ttRFqXs2ysy7F5A6oE8ytBuoz8sD8/aKW9QE0kbl7amsfoh4uT1t7sNvDqFRxfYbj3wlOcp3MzKUwU58NjaSoarXJmnmLs05ZA2bMqV7EA==\n====END LICENSE KEY====',
      plugins: [
        TimelinePointer(),
        Selection(),
        ItemResizing(),
        ItemMovement(),
        Bookmarks(),
      ],
      list: {
        columns: {
          data: {
            [GSTC.api.GSTCID('id')]: {
              id: GSTC.api.GSTCID('id'),
              width: 60,
              data: ({ row }) => GSTC.api.sourceID(row.id),
              header: {
                content: 'ID',
              },
            },
            [GSTC.api.GSTCID('label')]: {
              id: GSTC.api.GSTCID('label'),
              width: 200,
              data: 'label',
              header: {
                content: 'Label',
              },
            },
          },
        },
        rows: generateRows(),
      },
      chart: {
        items: generateItems(),
      },
    }
    state = GSTC.api.stateFromConfig(config)
    gstc = GSTC({
      element: this.$refs.gstc,
      state,
    })
  },
  beforeUnmount() {
    if (gstc) gstc.destroy()
  },
  methods: {
    updateFirstRow() {
      state.update(`config.list.rows.${GSTC.api.GSTCID('0')}`, (row) => {
        row.label = 'Changed dynamically'
        return row
      })
    },
    changeZoomLevel() {
      state.update('config.chart.time.zoom', 21)
    },
  },
}
</script>
<style scoped>
.gstc-component {
  margin: 0;
  padding: 0;
}
.toolbox {
  padding: 10px;
}
</style>
