import React from 'react';

const Logo = () => {

    document.addEventListener('DOMContentLoaded', (event) => {
        const path = document.querySelector('.L-one-long-stroke');
        const length = path.getTotalLength();
        path.style.setProperty('--path-length', length);
        path.style.strokeDashoffset = length;
      });



  return (
    <div className="logo">
      <svg className="brandLogo" viewBox="0 0 1210 654" fill="none" xmlns="http://www.w3.org/2000/svg">
<path className='fadeIn' d="M625.36 517.96C628.667 518.92 631.227 520.627 633.04 523.08C634.853 525.533 635.76 528.44 635.76 531.8C635.76 536.28 634.24 539.933 631.2 542.76C628.213 545.587 624.16 547 619.04 547H597.28V494.2H615.44C620.027 494.2 623.68 495.453 626.4 497.96C629.12 500.467 630.48 503.667 630.48 507.56C630.48 511.987 628.773 515.453 625.36 517.96ZM614.8 499.8H603.52V516.2H614.8C617.787 516.2 620.08 515.453 621.68 513.96C623.28 512.467 624.08 510.467 624.08 507.96C624.08 505.453 623.28 503.48 621.68 502.04C620.08 500.547 617.787 499.8 614.8 499.8ZM618.4 541.4C621.867 541.4 624.56 540.52 626.48 538.76C628.4 536.947 629.36 534.573 629.36 531.64C629.36 528.707 628.4 526.36 626.48 524.6C624.56 522.787 621.867 521.88 618.4 521.88H603.52V541.4H618.4ZM752.836 547L748.276 536.28H722.516L717.956 547H711.396L734.276 493.32H736.596L759.476 547H752.836ZM745.956 530.68L735.396 504.76L724.836 530.68H745.956ZM880.843 547H873.563L857.163 524.84H845.883V547H839.643V494.2H858.203C863.323 494.2 867.403 495.64 870.443 498.52C873.536 501.347 875.083 505 875.083 509.48C875.083 513.053 874.096 516.147 872.123 518.76C870.149 521.32 867.456 523.107 864.043 524.12L880.843 547ZM845.883 499.8V519.24H857.963C861.376 519.24 863.989 518.36 865.803 516.6C867.669 514.84 868.603 512.493 868.603 509.56C868.603 506.68 867.669 504.333 865.803 502.52C863.936 500.707 861.323 499.8 857.963 499.8H845.883ZM638.16 619.64C633.253 626.947 630.293 631.24 629.28 632.52L638 643H630.48L625.44 637C620.853 641.587 615.76 643.88 610.16 643.88C605.573 643.88 601.733 642.627 598.64 640.12C595.547 637.56 594 634.227 594 630.12C594 626.867 594.987 624.04 596.96 621.64C598.987 619.187 601.973 616.52 605.92 613.64C602.133 608.84 600.24 604.6 600.24 600.92C600.24 597.56 601.28 594.787 603.36 592.6C605.493 590.413 608.373 589.32 612 589.32C615.467 589.32 618.267 590.36 620.4 592.44C622.533 594.52 623.6 597.107 623.6 600.2C623.6 604.893 620.453 609.613 614.16 614.36L625.36 627.8C626.853 625.773 629.413 621.933 633.04 616.28L638.16 619.64ZM612 595C608.213 595 606.32 596.973 606.32 600.92C606.32 603.533 607.813 606.653 610.8 610.28C615.28 606.867 617.52 603.587 617.52 600.44C617.52 598.84 617.04 597.533 616.08 596.52C615.173 595.507 613.813 595 612 595ZM610.32 638.12C614.32 638.12 618.08 636.227 621.6 632.44L609.52 617.88C607.28 619.587 605.653 620.893 604.64 621.8C603.627 622.653 602.693 623.8 601.84 625.24C600.987 626.627 600.56 628.067 600.56 629.56C600.56 632.067 601.493 634.12 603.36 635.72C605.227 637.32 607.547 638.12 610.32 638.12ZM741.68 589.32C746.16 589.32 750.24 590.28 753.92 592.2C757.653 594.067 760.747 596.707 763.2 600.12L758.48 603.8C754.267 597.987 748.667 595.08 741.68 595.08C735.6 595.08 730.587 597.133 726.64 601.24C722.693 605.293 720.72 610.387 720.72 616.52C720.72 622.707 722.72 627.88 726.72 632.04C730.773 636.2 735.867 638.28 742 638.28C745.84 638.28 749.28 637.427 752.32 635.72C755.36 634.013 757.787 631.72 759.6 628.84V621.72H741.6V616.12H765.84V630.2C763.493 634.36 760.16 637.693 755.84 640.2C751.573 642.653 746.853 643.88 741.68 643.88C733.947 643.88 727.44 641.267 722.16 636.04C716.88 630.76 714.24 624.28 714.24 616.6C714.24 608.92 716.88 602.467 722.16 597.24C727.493 591.96 734 589.32 741.68 589.32ZM888.968 643H881.688L865.288 620.84H854.008V643H847.768V590.2H866.328C871.448 590.2 875.528 591.64 878.568 594.52C881.661 597.347 883.208 601 883.208 605.48C883.208 609.053 882.221 612.147 880.248 614.76C878.274 617.32 875.581 619.107 872.168 620.12L888.968 643ZM854.008 595.8V615.24H866.088C869.501 615.24 872.114 614.36 873.928 612.6C875.794 610.84 876.728 608.493 876.728 605.56C876.728 602.68 875.794 600.333 873.928 598.52C872.061 596.707 869.448 595.8 866.088 595.8H854.008ZM974.173 590.2V643H967.933V590.2H974.173ZM1065.28 590.2V637.4H1090.32V643H1059.04V590.2H1065.28ZM1176.15 590.2V637.4H1201.19V643H1169.91V590.2H1176.15Z" fill="white"/>
<circle className='fadeIn' cx="282.5" cy="335.5" r="20.5" fill="white"/>
<path className='fadeIn' fillRule="evenodd" clipRule="evenodd" d="M40 251H6V383V414H40H111V383H40V251Z" fill="white"/>
<path  className='fadeIn' fillRule="evenodd" clipRule="evenodd" d="M281.5 417C329.273 417 368 379.392 368 333C368 286.608 329.273 249 281.5 249C233.727 249 195 286.608 195 333C195 379.392 233.727 417 281.5 417ZM281.5 386C310.495 386 334 362.271 334 333C334 303.729 310.495 280 281.5 280C252.505 280 229 303.729 229 333C229 362.271 252.505 386 281.5 386Z" fill="white"/>
<path className='fadeIn' fillRule="evenodd"  clipRule="evenodd" d="M871 370.35V325H867H845.406H793V354H838V361.135C828.715 376.071 812.256 386 793.5 386C764.505 386 741 362.271 741 333C741 303.729 764.505 280 793.5 280C811.847 280 827.996 289.501 837.383 303.896L862.346 282.137C846.544 261.998 821.585 249 793.5 249C745.727 249 707 286.608 707 333C707 379.392 745.727 417 793.5 417C827.456 417 856.842 398 871 370.35Z" fill="white"/>
<path  className='fadeIn' d="M44.96 140.2V145.8H26.32V193H20.08V145.8H1.52V140.2H44.96ZM166.244 140.2V193H160.004V167.56H130.404V193H124.164V140.2H130.404V161.96H160.004V140.2H166.244ZM285.045 140.2V145.8H257.445V161.96H278.565V167.56H257.445V187.4H286.005V193H251.205V140.2H285.045Z" fill="white"/>
<path fillRule="evenodd"  clipRule="evenodd" d="M605 2H571V249V251V347.482L502 275.939V275.775L476.033 249H466V417V420V654H502V420V417V319.758L593.5 416.5H605V251V249V2Z" fill="white"/>
</svg>

    </div>
  );
};

export default Logo;