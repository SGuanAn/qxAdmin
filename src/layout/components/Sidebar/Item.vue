<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    total: {
      type: Number,
      default: 0
    }
  },
  render(h, context) {
    const { icon, title, total } = context.props
    const vnodes = []
    if (icon) {
      vnodes.push(<svg-icon icon-class={icon}/>)
    }
    if (total) {
      vnodes.push(<small class='total'>{(total)}</small>)
    }
    if (title) {
      vnodes.push(<span slot='title'>{(title)}</span>)
    }
    return vnodes
  }
}
</script>

<style lang="scss" scoped>
.total{
  background: #fd5c63;
  height: 20px;
  width: 30px;
  text-align:center;
  border-radius: 3px;
  font-size: 8px;
  line-height: 20px;
  color: #fff;
  position:absolute;
  top: 32%;
  right: 10px;
}
</style>
