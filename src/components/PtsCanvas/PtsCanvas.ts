import { Component, Prop, Vue } from 'vue-property-decorator'

// libs
// import { CanvasSpace, Group, Pt, Create } from 'pts'
let CanvasSpace: any
let Group: any
let Pt: any
let Create: any

@Component
export default class PtsCanvas extends Vue {
  @Prop()
  private type!: string

  /**
   * Creates an instance of PtsCanvas.
   * @memberof PtsCanvas
   */
  constructor() {
    super()
    let pts

    // ssr
    if (process.browser) {
      pts = require('pts')
      CanvasSpace = pts.CanvasSpace
      Group = pts.Group
      Pt = pts.Pt
      Create = pts.Create
    }
  }

  /**
   *
   *
   * @memberof PtsCanvas
   */
  public mounted(): void {
    if (!process.browser) {
      return
    }

    const space = new CanvasSpace('#pts').setup({
      bgcolor: '#fe3',
      resize: true,
      retina: true
    })
    // draw
    if (this.type === 'line') {
      this.showLine(space)
    }
  }

  /**
   *
   *
   * @private
   * @param {any} space
   * @memberof PtsCanvas
   */
  private showLine(space: any) {
    const form = space.getForm()

    const chain = new Group()
    let stretch = false

    // line
    space.add({
      animate: () => {
        // shorten the line when it's not stretching
        if (chain.length > (stretch ? 100 : 10)) {
          chain.shift()
        }

        form.strokeOnly('#123', 3).line(chain)
        form.fillOnly('#123').point(space.pointer, 10, 'circle')
      },

      action: (type: any, px: any, py: any) => {
        // stretch the line when mouse is down
        if (type === 'down') {
          stretch = true
        }
        if (type === 'up') {
          stretch = false
        }

        // add a point to the line when mouse moves
        if (type === 'move') {
          chain.push(new Pt(px, py))
        }
      }
    })

    let noiseLine: any = []

    // wave
    space.add({
      start: () => {
        // Create a line and a grid, and convert them to `Noise` points
        const ln = Create.distributeLinear(
          [
            new Pt(0, space.center.y * 1.5),
            new Pt(space.width, space.center.y * 1.5)
          ],
          20
        )
        // const gd = Create.gridPts( space.innerBound, 20, 20 );
        noiseLine = Create.noisePts(ln, 0.1, 0.1)
      },

      animate: () => {
        // Use pointer position to change speed
        const speed = space.pointer
          .$subtract(space.center)
          .divide(space.center)
          .abs()

        // Generate noise in a line
        let nps = noiseLine.map((p: any) => {
          p.step(0.01 * (1 - speed.x), 0.03 * speed.y)
          // return p.$add( 0, p.noise2D() * space.center.y );
          return p.$add(0, p.noise2D() * (space.size.y / 5))
        })

        // Draw wave
        nps = nps.concat([space.size, new Pt(0, space.size.y)])
        form.fillOnly('rgba(0,140,255,.65)').polygon(nps)
        form.fill('#fff').points(nps, 2, 'circle')
      }
    })

    setTimeout(
      () =>
        space
          .bindMouse()
          .bindTouch()
          .play(),
      0
    )
  }
}
